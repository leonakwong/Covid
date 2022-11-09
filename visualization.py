import pandas as pd 
import numpy as np
from sodapy import Socrata
from IPython.display import display
import matplotlib
import matplotlib.pyplot as plt
import requests

client = Socrata("data.cdc.gov", None)

results = client.get("djj9-kh3p", limit=2500)
covidData_df = pd.DataFrame.from_records(results)  

max_eh_states = covidData_df.loc[covidData_df["estimated_hesitant"] == covidData_df["estimated_hesitant"].max(), "state"].unique()
max_euh_states = covidData_df.loc[covidData_df["estimated_unsure_or_hesitant"] == covidData_df["estimated_unsure_or_hesitant"].max(), "state"].unique()
max_esh_states = covidData_df.loc[covidData_df["estimated_strongly_hesitant"] == covidData_df["estimated_strongly_hesitant"].max(), "state"].unique()
max_states = ['Pennsylvania', 'Texas', 'Rhode Island', 'Mississippi', 'Ohio']

min_eh_states = covidData_df.loc[covidData_df["estimated_hesitant"] == covidData_df["estimated_hesitant"].min(), "state"].unique()
min_euh_states = covidData_df.loc[covidData_df["estimated_unsure_or_hesitant"] == covidData_df["estimated_unsure_or_hesitant"].min(), "state"].unique()
min_esh_states = covidData_df.loc[covidData_df["estimated_strongly_hesitant"] == covidData_df["estimated_strongly_hesitant"].min(), "state"].unique()


barWidth = 0.25
fig = plt.subplots(figsize = (12, 8))
for state in max_states:
        while covidData_df.loc[covidData_df["state"] == covidData_df[state]]:
                EH = [covidData_df.loc[covidData_df["estimated_hesitant"]]]
                EUH = [covidData_df.loc[covidData_df["estimated_unsure_or_hesitant"]]]
                ESH = [covidData_df.loc[covidData_df["estimated_strongly_hesitant"]]]

br1 = np.arrange(len(EH))
br2 = [x + barWidth for x in br1]
br3 = [x + barWidth for x in br2]

plt.bar(br1, EH, color = 'g', width = barWidth,
        edgecolor = 'grey', label = 'estimated hesitant')
plt.bar(br2, EUH, color = 'y', width = barWidth,
        edgecolor = 'grey', label = 'estimated unsure or hesitant')
plt.bar(br3, ESH, color = 'r', width = barWidth,
        edgecolor = 'grey', label = 'estimated strongly hesitant')

plt.xlabel('States', fontweight = 'bold', fontsize = 15)
plt.ylabel('Hesitancy', fontweight = 'bold', fontsize = 15)
plt.xticks([r + barWidth for r in range(len(EH))],
            covidData_df["state"])

plt.legend()
plt.show()

#print(covidData_df.info())

