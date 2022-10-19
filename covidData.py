import pandas as pd


fields1 = ['modzcta', 'modzcta_name','lat','lon','people_positive']
fields2 = ['modzcta','hospitalization_count_28day','death_count_28day']


hf = pd.read_csv('https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/hosp_death_last28days-by-modzcta.csv', usecols=fields2)
hf = hf.set_index('modzcta')

df = pd.read_csv('https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/last7days-by-modzcta.csv', usecols=fields1)
df = df.set_index('modzcta')

cf = pd.merge(df, hf, left_index=True, right_index=True)

cf = cf.rename(columns={'people_positive': 'people_positive_7day'})


print("Contents of the Dataframe : ")
print(cf)
# # Drop first column of dataframe
# df = df.iloc[: , 1:]
# print("Modified Dataframe : ")
# print(df)
cf.to_csv('covidData.csv')