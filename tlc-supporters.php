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
		add_action( 'template_redirect', array( $this, 'template_redirect' ) );
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
			case 0:
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
		return 0;
	}

	//Do the usual paypal ipn stuff
	private function handle_paypal_ipn(){
		//TODO
		return 0;
	}

	/*
	* Installation script
	*/
	static function install(){
		global $wpdb;

		$table_name = $wpdb->prefix . $supporter_table_name;

		$sql = 'query here';

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);

		add_option("tlcSupporters_db_version", $db_version);

	}
}

$tlc_supporters = tlcSupporters::getInstance();
