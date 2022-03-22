const { FieldValue } = require("firebase-admin/firestore");
const { connectDb } = require('./connectDb')


exports.createStrategy = (request, response) => {
    const newStrategy = {
        strategy: request.body,
        enabled: true,
        created_at: FieldValue.serverTimestamp()
    }
    const db = connectDb();
    db.collection('strategies').add(newStrategy)
        .then(doc => response.status(201).send(doc.id))
        .catch(err => response.status(500).send(err));
}

exports.getStrategies = (request, response) => {
    console.log(request.params)
    const credential  = request.params
    console.log(credential)
    const { userId } = credential // read the property userId, and create a variable with its name
    console.log(userId)
    const db = connectDb();
    db.collection('strategies').where('strategy.userId', '==', userId).get() // this is how we will GET our 'strategies' collection from db
        .then(snapshot => { // capturing 'strategies' in the snapshot, getting ALL the strategies
            const strategyList = snapshot.docs.map(doc => {
                let strategy = doc.data();
                strategy.id = doc.id;
                return strategy; // we expect to get an empty array
            })
            response.send(strategyList);
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
              });
        })
        .catch(err => response.status(500).send(err))
}

// exports.getStrategies = (request, response) => {
//     const db = connectDb();
//     db.collection('strategies').get() // this is how we will GET our 'strategies' collection from db
//         .then(snapshot => { // capturing 'strategies' in the snapshot, getting ALL the strategies
//             const strategyList = snapshot.docs.map(doc => {
//                 let strategy = doc.data();
//                 strategy.id = doc.id;
//                 return strategy; // we expect to get an empty array
//             })
//             response.send(strategyList);
//         })
//         .catch(err => response.status(500).send(err))
// }

exports.updateStrategy = (request,response) => {
    const { strategyId } = request.params
    const isEnabled = request.body.enabled
    const db = connectDb();
    db.collection("strategies")
      .doc(strategyId)
      .update({enabled: isEnabled}) // this will update the 'status' of a strategy (moon symbol)
      .then((doc) => response.status(202).send(doc))
      .catch((err) => response.status(500).send(err));    
}
