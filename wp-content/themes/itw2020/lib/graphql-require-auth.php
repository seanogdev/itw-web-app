<?php
// add_action( 'do_graphql_request', 'force_graphql_api_authentication', 10, 1 );

function force_graphql_api_authentication( $query ) {
	if ( ! defined( 'GRAPHQL_HTTP_REQUEST' ) || true !== GRAPHQL_HTTP_REQUEST ) {
		return;
	}

	$introspection_query = \GraphQL\Type\Introspection::getIntrospectionQuery();
	$is_introspection_query = trim($query) === trim($introspection_query);

	if ( $is_introspection_query ) {
		return;
	}

	if (!is_user_logged_in()) {
		throw new \GraphQL\Error\UserError('You do not have permission to access the API');
	}
}
