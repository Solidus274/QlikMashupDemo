// This file is for the capability APIs
// Useful for most embedding needs where you want a Qlik-styled front end


// Construct prefix and path for Qlik Sense host, to the mashup, and to the resources folder
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	'host': 'qserver', //window.location.hostname,
	'prefix': '/',
	'port': 443, //window.location.port,
	'isSecure': true //window.location.protocol === "https:"
};

require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

// Create global variable
var app;

// Let's create some charts
require(["js/qlik"], function ( qlik ) {
        qlik.setOnError(function(error) {
            console.log(error.message);
        });
        
        // Let's have a peek at what we're holding in Qlik
        console.log("Contents of qlik:", qlik);

        // Let's open an app using our config above
        app = qlik.openApp("Executive Dashboard.qvf", config);
        console.log("Contents of app:", app);

        // Replace qsChart1 with the scatter plot from our app, based on the object GUID
        app.getObject("qsChart1", "fzrxtjq");

        // Replace qsChart2 with a pie chart from our app, based on the object GUID
        app.getObject("qsChart2", "NaKQwM");

        // Now create the same as KPI2 using the console and put this into qsChart3
        app.visualization.create(
            'piechart',
            [
                {
                "qDef": {
                  "qFieldDefs": [
                    "AccountDesc"
                  ],
                  "qFieldLabels": [
                    "Account"
                  ]
                },
                "qOtherTotalSpec": {
                    "qOtherMode": "OTHER_COUNTED",
                    "qOtherCounted": {
                        "qv": "25"
                    },
                    "qOtherLimit": {
                        "qv": "0"
                    },
                    "qOtherLimitMode": "OTHER_GE_LIMIT",
                    "qSuppressOther": false,
                    "qForceBadValueKeeping": true,
                    "qApplyEvenWhenPossiblyWrongResult": true,
                    "qGlobalOtherGrouping": false,
                    "qOtherCollapseInnerDimensions": false,
                    "qOtherSortMode": "OTHER_SORT_DESCENDING",
                    "qTotalMode": "TOTAL_OFF",
                    "qReferencedExpression": {
                        "qv": ""
                    }
                }
              },
              "=sum(ExpenseActual)"
            ],
            {
              "showTitles": true,
              "title": "Expenses by Accounts",
              "subtitle": {
                "qStringExpression": {
                    "qExpr": "'Total Expenses = ' & num(sum(ExpenseActual), '$#,##0')"
                }
                },
              "footnote": "",
              "donut": {
                "showAsDonut": true
              },
              "dimensionTitle": false,
				"dataPoint": {
					"auto": false,
					"labelMode": "share"
				},
				"color": {
					"auto": false,
					"mode": "byMeasure",
					"singleColor": "#4477aa",
					"persistent": false,
					"measureScheme": "sg",
					"reverseScheme": false,
					"dimensionScheme": "12"
				},
				"legend": {
					"show": false,
					"dock": "auto",
					"showTitle": true
				}
            }
          ).then(function(vis){
            vis.show("qsChart3");
            console.log("Contents of vis:", vis);
          });
        
        

        // We can also create a cube and do something with the result
        // In this case I'm just dropping it into the 
        app.createCube({
            qDimensions : [{
                qDef : {
                    // This will only return one due to my set analysis
                    qFieldDefs : ["='Result'"]
                },
                qNullSuppression : true
            }],
            qMeasures : [{
                qDef : {
                    qDef : "sum(ExpenseActual)"
                }
            }],
            qInitialDataFetch : [{
                qTop : 0,
                qLeft : 0,
                qHeight : 1,
                qWidth : 2
            }]
        }, function(reply) {
            // Let's log this output, we might want to use this in a vis later
            var expenseTotal = reply.qHyperCube.qDataPages[0].qMatrix[0][1].qNum;
            console.log("The output from the hypercube: ", expenseTotal);
            $('#qsChart4').html("<p>Sum of Expenses = " + expenseTotal + "</p>");
        });
        
        // Load current selections
        app.getObject("currSelections", "CurrentSelections");
        
    }
);