var config = {
	host: "qserver",
	prefix: "/jwt/",
	port: 443,
	isSecure: true
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );


	var app = qlik.openApp('1b32f30d-d1aa-4241-a962-1fbb1b797c85', config);

	//get objects -- inserted here --
	app.getObject('QV01','qZPdytp');
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
            vis.show("QV02");
            console.log("Contents of vis:", vis);
          });

} );
