<?php
/**
 * Initializes the WPGraphQL CORS plugin.
 *
 * @since 0.0.1
 * @package wp-graphql-cors
 */

/**
 * Class WP_GraphQL_CORS
 */
class WP_GraphQL_CORS {
	/**
	 * WP_GraphQL_CORS constructor
	 */
	public function __construct() {
		$this->add_dependency_check();
		$this->includes();
		$this->actions();
		$this->filters();
	}

	/**
	 * Check if WPGraphQL is installed and activated.
	 */
	public function add_dependency_check() {
		add_action(
			'plugins_loaded',
			function() {
				if ( ! class_exists( '\WPGraphQL' ) ) {
					add_action(
						'admin_notices',
						function() {
							?>
							<div class="error notice">
								<p>
									<?php
										esc_html__(
											'WPGraphQL must be installed and activated for "WPGraphQL CORS" to work',
											'wp-graphql-cors'
										);
									?>
								</p>
							</div>
							<?php
						}
					);
				}
			}
		);
	}

	/**
	 * Loads required files.
	 */
	private function includes() {
		require_once WPGRAPHQL_CORS_PLUGIN_DIR . '/includes/admin/admin.php';
		require_once WPGRAPHQL_CORS_PLUGIN_DIR . '/includes/admin/settings/class-section.php';
		require_once WPGRAPHQL_CORS_PLUGIN_DIR . '/includes/admin/settings/class-main.php';
		require_once WPGRAPHQL_CORS_PLUGIN_DIR . '/includes/process-request.php';
		require_once WPGRAPHQL_CORS_PLUGIN_DIR . '/includes/logout-mutation.php';
	}

	/**
	 * Add actions.
	 */
	private function actions() {
		add_action( 'admin_init', 'wpgraphql_cors_admin_page_init' );
		add_action( 'admin_menu', 'wpgraphql_cors_admin_menu' );
		add_action( 'graphql_process_http_request_response', 'wpgraphql_cors_filter_cookies', 10 );
		add_action( 'graphql_register_types', 'wpgraphql_cors_logout_mutation' );
	}

	/**
	 * Add filters
	 */
	private function filters() {
		add_filter( 'graphql_response_headers_to_send', 'wpgraphql_cors_response_headers' );
		add_filter( 'graphql_endpoint', 'wpgraphql_cors_graphql_endpoint' );
	}
}
