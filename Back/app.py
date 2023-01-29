import pandas as pd
from flask import Flask,request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/read')
def read():
    df = pd.read_csv('diamond.csv')
    return df.to_json(orient='split',index=False)

@app.route('/read/sum')
def sum():
    df = pd.read_csv('diamond.csv')
    return str(df["price"].sum())

@app.route('/read/max')
def max():
    df = pd.read_csv('diamond.csv')
    return str(df.max()["price"])

@app.route('/read/counts')
def ideals():
    df = pd.read_csv('diamond.csv')
    return df['cut'].value_counts().to_dict()

@app.route('/read/colors')
def colors():
    df = pd.read_csv('diamond.csv')
    return df['color'].value_counts().index.to_list()

@app.route('/read/premiumMedian')
def premiumMedian():
    df = pd.read_csv('diamond.csv')
    crt = pd.DataFrame(tuple(df[df['cut'] == "Premium"]["carat"].to_list()))
    return crt.median().to_dict()

@app.route('/read/avgPerCut')
def avgPerCut():
    df = pd.read_csv('diamond.csv')
    newdf = pd.DataFrame(df,columns=['cut','carat'])
    Fair = (newdf[newdf["cut"] == "Fair"]["carat"].sum())/len(newdf[newdf["cut"] == "Fair"])
    Good = (newdf[newdf["cut"] == "Good"]["carat"].sum())/len(newdf[newdf["cut"] == "Good"])
    Ideal = (newdf[newdf["cut"] == "Ideal"]["carat"].sum())/len(newdf[newdf["cut"] == "Ideal"])
    Premium = (newdf[newdf["cut"] == "Premium"]["carat"].sum())/len(newdf[newdf["cut"] == "Premium"])
    VeryGood = (newdf[newdf["cut"] == "Very Good"]["carat"].sum())/len(newdf[newdf["cut"] == "Very Good"])
    return {"Fair":Fair,"Good":Good,"Ideal":Ideal,"Premium":Premium,"VeryGood":VeryGood}

@app.route('/read/avgPerColor')
def avgPerColor():
    df = pd.read_csv('diamond.csv')
    newdf = pd.DataFrame(df,columns=['price','color'])
    G = (newdf[newdf["color"] == "G"]["price"].sum())/len(newdf[newdf["color"] == "G"])
    E = (newdf[newdf["color"] == "E"]["price"].sum())/len(newdf[newdf["color"] == "E"])
    F = (newdf[newdf["color"] == "F"]["price"].sum())/len(newdf[newdf["color"] == "F"])
    H = (newdf[newdf["color"] == "H"]["price"].sum())/len(newdf[newdf["color"] == "H"])
    D = (newdf[newdf["color"] == "D"]["price"].sum())/len(newdf[newdf["color"] == "D"])
    I = (newdf[newdf["color"] == "I"]["price"].sum())/len(newdf[newdf["color"] == "I"])
    J = (newdf[newdf["color"] == "J"]["price"].sum())/len(newdf[newdf["color"] == "J"])
    
    return {"G":G,"E":E,"F":F,"H":H,"D":D,"I":I,"J":J}

@app.route('/add', methods=['POST'])
def add():
    data = request.get_json()
    print(data["diamond"])
    df2 = pd.DataFrame([[data["diamond"]["carat"],data["diamond"]["cut"],data["diamond"]["color"],data["diamond"]["clarity"],data["diamond"]["depth"],data["diamond"]["table"],data["diamond"]["price"],data["diamond"]["x"],data["diamond"]["y"],data["diamond"]["z"]]])
    with open('diamond.csv', 'a') as f:
        f.write('\n')
    df2.to_csv("diamond.csv",mode='a', index=False, header=False)
    return "New Diamond added"

@app.route('/update/<id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    df = pd.read_csv('diamond.csv')
    for i in df.to_dict()["x"].keys():
        if i == int(id):
            print(df[0])
            # df[i] = data["diamond"]["carat"],data["diamond"]["cut"],data["diamond"]["color"],data["diamond"]["clarity"],data["diamond"]["depth"],data["diamond"]["table"],data["diamond"]["price"],data["diamond"]["x"],data["diamond"]["y"],data["diamond"]["z"]
            # print(df[i])
    df.to_csv('diamond.csv', index=False)
    return "Data deleted successfully!"

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
    df = pd.read_csv('diamond.csv')
    for i in  df.to_dict()["x"].keys():
        if i == int(id):
            df.drop(i, inplace=True)
    df.to_csv('diamond.csv', index=False)
    return "Data deleted successfully!"

if __name__ == '__main__':
    app.run(debug=True)
