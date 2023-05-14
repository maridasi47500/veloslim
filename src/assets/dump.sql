CREATE TABLE IF NOT EXISTS trajets (
id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat1 TEXT, 
    lng1 TEXT, 
    lat2 TEXT, 
    lng2 TEXT, 
    depart TEXT,
    arrivee TEXT,
    user_id,
    trajet TEXT
)
INSERT or IGNORE INTO trajets(id, artist_name, song_name) VALUES (1, '9.160530958566899', '-52.65170931816101','5.160792749532797','	-4.7486623287201','chez l', 'chez lui',null,'Avenue , Rue  664.9 m, 1 min 30 s Head northeast on Avenue du  100 m Turn right onto Avenue  300 m Turn right onto Rue   30 m Turn right onto Rue  200 m You have arrived at your destination, on the right 0 m');