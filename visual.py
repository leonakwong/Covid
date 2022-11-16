import pandas as pd 
import numpy as np
from sodapy import Socrata
from IPython.display import display
import matplotlib
import matplotlib.pyplot as plt
import requests

client = Socrata("data.cdc.gov", None)
results = client.get("q9mh-h2tw", limit=2000)
covidData_df = pd.DataFrame.from_records(results)  
eh_by_state = {}
euh_by_state = {}
esh_by_state = {}


for i in range(len(covidData_df['state_code'])):
    state_code = covidData_df['state_code'][i] 
    eh_by_state[state_code] = eh_by_state.get(state_code, [])
    eh_by_state[state_code].append(float(covidData_df["estimated_hesitant"][i]))
    euh_by_state[state_code] = euh_by_state.get(state_code, [])
    euh_by_state[state_code].append(float(covidData_df["estimated_hesitant_or_unsure"][i]))
    esh_by_state[state_code] = esh_by_state.get(state_code, [])
    esh_by_state[state_code].append(float(covidData_df["estimated_strongly_hesitant"][i]))

eh_avg = []
euh_avg = []
esh_avg = []
for state_code in eh_by_state:
    eh_avg.append(sum(eh_by_state[state_code])/len(eh_by_state[state_code]))
    euh_avg.append(sum(euh_by_state[state_code])/len(euh_by_state[state_code]))
    esh_avg.append(sum(esh_by_state[state_code])/len(esh_by_state[state_code]))

width = 0.20
x = np.arange(len(eh_avg))
fig, ax=plt.subplots()
br1 = ax.bar(x, eh_avg, width, color = 'g', label="estimated hesitant")
br2 = ax.bar(x+width, euh_avg, width, color = 'y', label="estimated unsure or hesitant")
br3 = ax.bar(x+width*2, esh_avg, width, color = 'r', label="estimated strongly hesitant")

ax.set_ylabel("Hesitancy")
states = sorted(list(eh_by_state.keys()))
ax.set_xticks(x+width, states)
# ax.bar_label(br1, padding=3)
# ax.bar_label(br2, padding=3)
# ax.bar_label(br3, padding=3)
plt.legend()
plt.show()

