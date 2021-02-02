#!/usr/bin/env python
# coding: utf-8


# Dependencies and Setup
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# File to Load (Remember to Change These)
file_to_load = "/Users/mackenziebaucum/Desktop/Team-2_Final-Project/Resources/cleaned_posts.csv"

# Read Purchasing File and store into Pandas data frame
mb_types = pd.read_csv(file_to_load)
mb_types_df = pd.DataFrame(mb_types)
mb_types_df.head()


UniqueLabel = len(mb_types_df["label"].unique())
UniqueLabel = pd.DataFrame({"Label Count": [UniqueLabel]})
UniqueLabel



mb_types_df.rename(columns = {'label':'Type'}, inplace = True) 
mb_types_df.head()



#Label Type Count
mb_df=mb_types_df.groupby(['Type'],as_index=False).size()
mb_df



mb_types_df.groupby('Type').agg('count').reset_index()


pip install pyecharts


from pyecharts.charts import Bar
from pyecharts import options as opts
from pyecharts.globals import ThemeType

bar = (
    Bar()
    .add_xaxis(['ENFJ','ENFP','ENTJ','ENTP','ESFJ','ESFP','ESTJ','ESTP','INFJ','INFP','INTJ','INTP','ISFJ','ISFP','ISTJ','ISTP'])
    .add_yaxis("Count", [8814,31112,10690,32071,1971,2087,1826,4084,67638,83569,49400,59144,7585,11928,9290,15314],color="#1565C0")
    .set_global_opts(title_opts=opts.TitleOpts(title="Frequency of Types", subtitle="Meyers Briggs Type Indicator"))
    .set_series_opts(
        label_opts=opts.LabelOpts(is_show=False),
        markpoint_opts=opts.MarkPointOpts(
        data=[opts.MarkPointItem(type_="max", name="Highest Value"),
              opts.MarkPointItem(type_="min", name="Lowest Value"),]),
                )
                )
bar.render_notebook()





