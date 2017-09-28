var express = require('express');
var AWS = require("aws-sdk");
var router = express.Router();
var user=require("../module/user")

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

router.get('/getTable', function (req, res, next) {

    var docClient = new AWS.DynamoDB.DocumentClient;

    /*var params = {
        TableName: "sensor",
        KeyConditionExpression: "#activity = :activity_val",
        ExpressionAttributeNames: {
            "#activity": "sensor_activity"
        },
        ExpressionAttributeValues: {
            ":activity_val": 7
        }
    };*/

    docClient.scan({
        TableName:"sensor",
        Limit:50
    },function (err,data) {
        if(err){
            console.log(err); return;
        }
            console.log(data);

    });


    /*docClient.batchGetItem(
        {"RequestItems":
            {"sensor":
                {"Keys" :
                    [{"HashKeyElement"  : {"S":"white"}, "RangeKeyElement":{"N":"2"}},
                {"AttributesToGet":["sensor_activity","sensor_humidity"]}}

            }}, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function (item) {
                console.log(" -", item.sensor_humidity + ": " + item.sensor_temperature);
            });
        }
    });*/

    /*docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function (item) {
                console.log(" -", item.sensor_humidity + ": " + item.sensor_temperature);
            });
        }
     });*/

});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
    //res.render('index', { title1: 'Hi' });
});


module.exports = router;
