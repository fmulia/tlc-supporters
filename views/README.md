Follow the standard @ http://tommcfarlin.com/wordpress-plugin-file-organization/

For admin pages

    include( plugin_dir_path( __FILE__ ) . '/views/admin.php' );

For shortcode pages

    file_get_contents