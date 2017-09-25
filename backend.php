<?php

ini_set('display_errors', 0);

define('ROOT_DIR', dirname(__FILE__));


require_once(ROOT_DIR.'/file.class.php');

//$ajaxData = filter_input(INPUT_POST, 'ajaxData');
$action = filter_input(INPUT_POST, 'action');
$filename = filter_input(INPUT_POST, 'filename');
$jsonData = filter_input(INPUT_POST, 'jsonData');
//$data = filter_input(INPUT_POST, 'data');


if($action == 'writeJSON'){
	$file = new FILE();
	$file->createFile($filename);
	$file->jsondata = $jsonData;
	$ans['result'] = $file->writeData();
}elseif($action == 'readJSON'){
	$file = new FILE();
	$file->filename = $filename;

	if($file->openFile()){
		$jsonData = $file->readFile();
		$ans['json'] = $jsonData;
	}else{
		$ans['error'] = 'File '.$filename." not found";
	}
}


//$ans['html'] = "php_backend";
//$ans['html'] = ROOT_DIR.'/file.class.php';
//$ans['html'] = $file->test();
$ans['html'] = $filename;


echo json_encode($ans);

?>