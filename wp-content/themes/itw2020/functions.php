<?php

include('lib/graphql-require-auth.php');

// override limit
add_filter('graphql_connection_max_query_amount', function ($args) {
  return 999;
});
