import { Component, OnInit, NgZone } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as tfv from '@tensorflow/tfjs-vis';

@Component({
  selector: 'app-iris-classifier',
  templateUrl: './iris-classifier.component.html',
  styleUrls: ['./iris-classifier.component.scss']
})
export class IrisClassifierComponent implements OnInit {
  model: tf.Sequential;
  trainingData: any;
  convertedData: any;
  numOfFeatures: any;;
  numOfSamples: number;
  predictModel: any;
  trainInProgress: any;
  noOfEpocs: any;
  constructor( private ngZone: NgZone ) { }

  ngOnInit() {
    this.loadModel();
    this.createModel();
  }
  loadModel(){
    const csvUrl = './docs/assets/iris/iris.csv';
    this.trainingData = tf.data.csv(csvUrl, {
        columnConfigs: {
            species: {
                isLabel: true
            }
        }
    });
    console.log("lenght : ", this.trainingData.columnNames());
  }

async createModel(){
  const numOfFeatures = (await this.trainingData.columnNames()).length - 1;
  const numOfSamples = 150;
   this.convertedData =
        this.trainingData.map(({xs, ys}) => {
            const labels = [
                  ys.species == "setosa" ? 1 : 0,
                  ys.species == "virginica" ? 1 : 0,
                  ys.species == "versicolor" ? 1 : 0
            ]
            return{ xs: Object.values(xs), ys: Object.values(labels)};
        }).batch(10);
     this.model = tf.sequential();
    this.model.add(tf.layers.dense({inputShape: [numOfFeatures], activation: "sigmoid", units: 5}))
    this.model.add(tf.layers.dense({activation: "softmax", units: 3}));

    this.model.compile({loss: "categoricalCrossentropy", optimizer: tf.train.adam(0.06)});
    const surface = {name: 'Model Summary', tab: 'Model Inspection'};
    tfv.show.modelSummary(surface, this.model);
    this.doTraining(this.model).then(() => {
      const testVal = tf.tensor2d([4.4, 2.9, 1.4, 0.2], [1, 4]);
      const surface2 = {name: 'Values Distribution', tab: 'Model Inspection'};
                          this.predictModel = this.model.predict(testVal);
                          console.log("prediction : ", this.predictModel);
          tfv.show.valuesDistribution(surface2, this.predictModel);
    }).catch(err => console.log(err));
  }

async doTraining(model){
  const history = await model.fitDataset(this.convertedData,
                   {epochs:100,
                    callbacks:{
                        onEpochEnd: async(epoch, logs) =>{
                          this.ngZone.run(() => {
                            this.trainInProgress = logs.loss;
                            this.noOfEpocs = epoch;
                          });
                            console.log("Epoch: " + epoch + " Loss: " + logs.loss);
                    }
        }});
}
}
