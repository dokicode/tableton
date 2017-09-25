<?php

class FILE{

	public $jsondata;
	public $fp;
	public $filename;

	public function __construct(){

	}

	public static function test(){
		return 'class file answer';
	}


	public function createFile($filename){
		$fp = fopen($filename, 'w+');
		$this->fp = $fp;
		//fclose($fp);
	}

	public function openFile(){
		return $this->fp = fopen($this->filename, 'r');
	}

	public function readFile(){
		$content = fread($this->fp, filesize($this->filename));
		return $content;
	}

	public function writeData(){
		if(fwrite($this->fp, $this->jsondata)){
			return 'ok';
		}else{
			return 'nok';
		}
	}

}

?>