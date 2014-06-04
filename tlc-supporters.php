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
		echo plugin_dir_path( __FILE__ );
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
