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

} );
