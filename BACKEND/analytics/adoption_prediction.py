import os
import pandas as pd
import psycopg2
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OrdinalEncoder

def run_ml_intelligence():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    query = "SELECT species, breed, health_status, adoption_status FROM animals"
    df = pd.read_sql(query, conn)
    
    if len(df) < 10: return 

    # Robust encoding for unseen categories [cite: 1, 2, 3]
    enc = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
    
    feature_cols = ['species', 'health_status']
    df_encoded = enc.fit_transform(df[feature_cols])
    df['target'] = (df['adoption_status'] == 'Adopted').astype(int)

    model = RandomForestClassifier(n_estimators=100).fit(df_encoded, df['target'])

    avail = pd.read_sql("SELECT animal_id, species, health_status FROM animals WHERE adoption_status = 'Available'", conn)
    if not avail.empty:
        avail_encoded = enc.transform(avail[feature_cols])
        probs = model.predict_proba(avail_encoded)[:, 1]

        cur = conn.cursor()
        for i, row in avail.iterrows():
            cur.execute("UPDATE animals SET adoption_probability = %s WHERE animal_id = %s", (int(probs[i]*100), int(row['animal_id'])))
        conn.commit()
    conn.close()

if __name__ == "__main__":
    run_ml_intelligence()

