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

define(PAYPAL_IPN_ACTION, 0);
register_activation_hook( __FILE__, array( 'tlcSupporters', 'install' ) );
/**
* TLC Supporters
*/
class tlcSupporters{
	private $supporter_table_name = "supporters";
	private $db_version = "1.0";
	static private $instance = false;

	private function __construct(){
		//Incepting IPN
		add_action('template_redirect', array($this, 'template_redirect'));
		add_shortcode('track-impact', array($this, 'track_impact_handler'));
		add_action('admin_menu', array($this,'admin_menu'));
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
		//TODO
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
		$_POST['cmd'] = "_notify-validate";

		$params = array(
			'body' => $_POST,
			'sslverify' => apply_filters( 'paypal_framework_sslverify', false ),
			'timeout' 	=> 30,
		);

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
		$this->paypal_ipn_db();
		$this->paypal_ipn_mailchimp();
		//stops the request so that PayPal receives a 200 response
		exit;
	}

	private function paypal_ipn_db(){
		//save $_POST['payer_email'] + $_POST['mc_gross'] and $_POST['mc_currency'] and $_POST['payment_status'] to db
		return 0;
	}

	private function paypal_ipn_mailchimp(){
		//add $_POST['payer_email'] to mailchimp
	}

	

	//Handler for shortcode for donations flow
	public function track_impact_handler(){
		//TODO
		$output = '';
		return $output;
	}

	public function admin_menu(){
		add_options_page("TLCSupporters Admin", "TLCSupporters Admin", 1, "TLCSupporters_Admin", array($this, "admin_page"));
	}

	public function admin_page(){
		include('views/admin_page.php');
	}
	/*
	* Installation script
	*/
	static function install(){
		global $wpdb;

		$table_name = $wpdb->prefix . $supporter_table_name;

		$sql = 'query here';

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		//dbDelta($sql);

		add_option("tlcSupporters_db_version", $db_version);

	}
}

$tlc_supporters = tlcSupporters::getInstance();
