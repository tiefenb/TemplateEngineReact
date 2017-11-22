<?php

  //TODO here: copy files from view path, compile with rollup, cache it
  // bring tempalte name to js component format eg. some-cool-template --> some_cool_template

  $v8 = new V8Js();
  $props = [
  	"data" => array(
      array(1, 2, 3),
      array(4, 5, 6),
      array(7, 8, 9)
    )
  ];
  $propsJson = json_encode($props);
  $javascript = [
         'const global = {};',
         file_get_contents('./js/bundle/react.bundle.js'),
         file_get_contents('./js/bundle/index.bundle.js'),
         'ReactVendor.ReactDOMServer.renderToString(ReactVendor.React.createElement(View.some_cool_template, ' . $propsJson . '));'
  ];

  try {
  	$result = $v8->executeString(implode(PHP_EOL, $javascript));
  } catch (Exception $e) {
  	echo '<h1>', $e->getMessage(), '</h1>';
  	echo '<pre>', $e->getTraceAsString(), '</pre>';
  	exit;
  }

  // print rendered markup
  echo '<div id="here">' . $result . '</div>';
