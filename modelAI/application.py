from flask import Flask,render_template,request,redirect
from flask_cors import CORS,cross_origin
from flask_restplus import Api, Resource, fields
from flask import jsonify
import pickle
import pandas as pd
import numpy as np
import json

app=Flask(__name__)
api = Api()
ns = api.namespace('', description='Car Price Prediction')  
     
model = api.model('Car',  {
    'company': fields.String(required=True, description='The company of the car'),
    'car_models': fields.String(required=True, description='The model of the car'),
    'year': fields.String(required=True, description='Manufactor year'),
    'fuel_type': fields.String(required=True, description='Car fuel type'),
    'kilo_driven': fields.String(required=True, description='distance driven in kilometres')
})


cors=CORS(app)
model=pickle.load(open('LinearRegressionModel.pkl','rb'))
car=pd.read_csv('Cleaned_Car_data.csv')

@app.route('/',methods=['GET','POST'])
def index():
    companies=sorted(car['company'].unique())
    car_models=sorted(car['name'].unique())
    year=sorted(car['year'].unique(),reverse=True)
    fuel_type=car['fuel_type'].unique()
    print(companies)
    print(car_models)
    companies.insert(0,'Select Company')
    return render_template('index.html',companies=companies, car_models=car_models, years=year,fuel_types=fuel_type)

@app.route('/cars_data')
def carsDate():
    companies=sorted(car['company'].unique())
    car_models=sorted(car['name'].unique())
    year=sorted(car['year'].unique(),reverse=True)
    fuel_type=car['fuel_type'].unique()
    print(type(year))
    car_data = {
        'companies': list(companies),
        'car_models': list(car_models),
        'year': list([int(item) for item in year]),
        'fuel_type': list(fuel_type),
    }
    with open('car_data.json', 'w') as f:
        json.dump(car_data, f)
    return json.dumps(car_data)


@app.route('/predict',methods=['POST'])
@cross_origin()
@ns.expect(model)
def predict():
    '''
    company=request.form.get('company')
    car_model=request.form.get('car_models')
    year=request.form.get('year')
    fuel_type=request.form.get('fuel_type')
    driven=request.form.get('kilo_driven')
    '''
    data = request.get_json()
    print(data)
    prediction=model.predict(pd.DataFrame(columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'],
                              data=np.array([data['car_models'], data['company'], data['year'], data['kilo_driven'], data['fuel_type']]).reshape(1, 5)))
    print(prediction)

    return jsonify(price = str(np.round(prediction[0] * 0.013 ,2)))



if __name__=='__main__':
    app.run(host="127.0.0.1", port=8080)