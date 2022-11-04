import pandas as pd
from sodapy import Socrata

# Unauthenticated client only works with public data sets. Note 'None'
# in place of application token, and no username or password:
client = Socrata("data.cdc.gov", None)

# Example authenticated client (needed for non-public datasets):
# client = Socrata(data.cdc.gov,
#                  MyAppToken,
#                  username="user@example.com",
#                  password="AFakePassword")

# First 2000 results, returned as JSON from API / converted to Python list of
# dictionaries by sodapy.

ny = '10001|10118|10002|10003|10004|10005|10006|10007|10009|10010|10011|10012|10013|10014|10016|10017|10018|10019|10020|10021|10022|10023|10024|10025|10026|10027|10028|10029|10030|10031|10032|10033|10034|10035|10036|10037|10038|10039|10040|10044|10065|10069|10075|10162|10128|10280|10282|10301|10302|10303|10304|10305|10306|10307|10308|10309|10310|10312|10314|10451|10452|10453|10454|10455|10456|10457|10458|10459|10460|10461|10462|10463|10464|10465|10466|10467|10468|10469|10470|10471|10472|10473|10474|10475|11004|11005|11101|11102|11103|11104|11105|11106|11109|11201|11203|11204|11205|11206|11207|11208|11209|11210|11211|11249|11212|11213|11214|11215|11216|11217|11243|11218|11219|11220|11221|11222|11223|11224|11225|11226|11228|11229|11230|11231|11232|11233|11234|11235|11236|11237|11238|11239|11354|11355|11356|11357|11358|11360|11361|11362|11363|11364|11365|11366|11367|11368|11369|11370|11372|11373|11374|11375|11377|11378|11379|11385|11411|11412|11413|11414|11415|11416|11417|11418|11419|11420|11421|11422|11423|11426|11427|11428|11429|11432|11433|11434|11435|11436|11691|11692|11693|11694|11697'

results = client.get("5jp2-pgaw", loc_admin_state = 'NY', limit=30000)

# Convert to pandas DataFrame
results_df = pd.DataFrame.from_records(results)

results_df.to_csv('vaxCenterUpdated.csv')

fields = ['latitude', 'longitude', 'loc_name', 'loc_admin_street1','loc_admin_city','loc_admin_state','loc_admin_zip','loc_phone','web_address','insurance_accepted','med_name']

data = pd.read_csv('vaxCenterUpdated.csv',skipinitialspace=True, usecols=fields)


# Filter the data accordingly.
f1 = data[data['loc_admin_zip'].str.contains(ny)]
f2 = pd.DataFrame(columns=fields)

dict = {} #key: location, value: medicine
dict2 = {} #key: location, value: index
indNum = -1
for row in f1.itertuples(index = True):
    locName = str(getattr(row, 'loc_name'))
    medName = str(getattr(row, 'med_name'))
    if locName not in dict:
        dict[locName] = medName
        newf2 = pd.DataFrame([row])
        f2 = pd.concat([f2, newf2], axis = 0, ignore_index=True)
        indNum += 1
        dict2[locName] = indNum
    else:
        dict[locName] += ':' + medName
for row in f2.itertuples(index = True):
    locName2 = str(getattr(row, 'loc_name'))
    if len(dict[locName2]) > 1:
        f2.at[dict2[locName2], 'med_name'] = dict[locName2]


f1.to_csv('vaxCenterF1.csv',index=False)
f2.to_csv('vaxCenterCons.csv',index=False)