<?php

/**
 * Plugin Name: TLC Supporters
 * Plugin URI: http://paypal.com
 * Description: TLC Supporters database
 * Version: 0.0
 * Author: PayPal
 * Author URI: http://paypal.com
 * License: GPL
 * Text Domain: TLC Supporters
 */

require_once 'lib/MCAPI.class.php';

define(PAYPAL_IPN_ACTION, 1);
global $wp;
/**
* TLC Supporters
*/
class tlcSupporters{
	private $supporter_table_name = "supporters";
	private $db_version = "1.0";
	static private $instance = false;
	
	private $current_url;

	private function __construct(){
		//Incepting IPN
		add_action('template_redirect', array($this, 'template_redirect'));
		add_shortcode('track-impact', array($this, 'track_impact_handler'));
		//add_action('admin_menu', array($this,'admin_menu'));
	}

	public static function getInstance() {
		if ( !self::$instance )
			self::$instance = new self;
		return self::$instance;
	}

	//IPN related stuff
	//This function will load on every page load.
	public function template_redirect(){
		$action = $this->template_action();
		switch ($action) {
			case PAYPAL_IPN_ACTION:
				$this->handle_paypal_ipn();
				break;
			
			default:
				//for the other pages, do nothing
				break;
		}
	}

	//Returns action to take
	private function template_action(){
		if ($this->validate_paypal_ipn()) {
			return PAYPAL_IPN_ACTION;
		}
		return 0;
	}

	private function validate_paypal_ipn(){
		/*
		* TODO
		* Check if the url is correct
		*/
		if(!(isset($_GET['action']) && $_GET['action'] == 'ipn')){
			return false;
		}
		$_POST['cmd'] = "_notify-validate";

		$params = array(
			'body' => $_POST,
			'sslverify' => apply_filters( 'paypal_framework_sslverify', false ),
			'timeout' 	=> 30,
		);
		//TODO: add paypal url
		$resp = wp_remote_post( $this->_url[$this->_settings['sandbox']], $params );

		// Put the $_POST data back to how it was so we can pass it to the action
		unset( $_POST['cmd'] );

		// If the response was valid, check to see if the request was valid
		if ( !is_wp_error($resp) && $resp['response']['code'] >= 200 && $resp['response']['code'] < 300 && (strcmp( $resp['body'], "VERIFIED") == 0)) {
			//Success
			return true;
		} else {
			//Failure
			return false;
		}
	}

	//Do the usual paypal ipn stuff
	private function handle_paypal_ipn(){
		$this->paypal_ipn_mailchimp();
		//stops the request so that PayPal receives a 200 response
		exit;
	}

	private function paypal_ipn_mailchimp(){
		//add $_POST['payer_email'] to mailchimp
		$mcapikey = 'e052d15ae7d0ceafaa09ae9e13d30750-us2';
		$listId = '9451f48648'; //list ID to subscribe to
		$mcapi = new MCAPI($mcapikey);
		$merge_vars = array('');
		//pass the payer email address to $payer_email
		$retval = $mcapi->listSubscribe( $listId, $payer_email, $merge_vars, 'html', false, false, true, true );
		if ($mcapi->errorCode){
			//do something if there is subscription error
		} 
	}

	

	//Handler for shortcode for donations flow
	public function track_impact_handler(){
		//TODO
		$output = file_get_contents('wp-content/plugins/tlc-supporters/views/track_impact.php');
		return $output;
	}

	public function admin_menu(){
		add_options_page("TLCSupporters Admin", "TLCSupporters Admin", 1, "TLCSupporters_Admin", array($this, "admin_page"));
	}

	public function admin_page(){
		include('views/admin_page.php');
	}

}

$tlc_supporters = tlcSupporters::getInstance();
