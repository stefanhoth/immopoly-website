<?php

/** XMLHttpRequest PHP Proxy
 * @author          Andrea Giammarchi
 * @blog            http://webreflection.blogspot.com/
 * @license         Mit Style License
 * @requires        curl and Apache webserver
 * @description     basic authentication, GET, POST, HEAD, PUT, DELETE, others requests types.
 *                  Nothing to do on the client side, except put "proxy.php?url=" as request prefix.
 *                  The rest should be like normal in-server interaction
 * @note            DON'T TRY AT HOME
 * 
 * CHANGELOG
 * 
 * v1.1 Add whitelist-check by Stefan Hoth <sh@jnamic.com>  
 * v1.0 initial release by Andrea Giammarchi
 */


/***************************************
 *
 * CONFIG
 *
 **************************************/

/**
 * only domains listed in this array will be allowed to be proxied
 */
$WHITELIST_DOMAINS = array('immopoly.appspot.com');

/***************************************
 *
 * CONFIG END, NOTHING TO EDIT BELOW HERE
 *
 **************************************/

//activate output buffer
ob_start();

function logline($message=null){

    static $logfile = "./log.txt";

    exec("echo \"".date(DATE_RFC2822)." :".$message."\" >> ".$logfile);
}


// if no url has been provided, exit
if(!isset($_GET['url'])){
    header('HTTP/1.1 400 Bad Request');
    header('X-Proxy-Error: no url');
    exit;
}elseif (   is_array($WHITELIST_DOMAINS) && ! empty($WHITELIST_DOMAINS) && 
            ! in_array( parse_url($_GET['url'],PHP_URL_HOST), $WHITELIST_DOMAINS) ) 
    {

    header('HTTP/1.1 400 Bad Request');
    header('X-Proxy-Error: URL not in WHITELIST_DOMAINS');
    exit;
}



// work in progress
/* without Apache ... requires alternatives for Authorization and other stuff not in $_SERVER
if(!function_exists('getallheaders')){
    function getallheaders(){
        $headers= array();
        foreach($_SERVER as $key => $value){
            if(0 === strpos($key, 'HTTP_'))
                $headers[str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))] = $value;
        }
        return $headers;
    }
}
// */

// GET, POST, PUT, HEAD, DELETE, ect ...
$method = $_SERVER['REQUEST_METHOD'];

// curl headers array
$headers= array();
if(function_exists('getallheaders')){
    foreach(getallheaders() as $key => $value){
        $headers[] = $key.': '.$value;
    }
}

// curl options
$opts   = array(
    CURLOPT_HEADER => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_BINARYTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_HTTPHEADER => $headers
);

// if request is post ...
if($method === 'POST'){
    // populate the array of keys/values to send
    $headers = array();
    foreach($_POST as $key => $value)
        $headers[] = rawurlencode($key).'='.rawurlencode($value);
    $opts[CURLOPT_POST] = true;
    $opts[CURLOPT_POSTFIELDS] = implode('&', $headers);
}

// if it is a basic authorization request ...
if(isset($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW'])){
    // create user and pass parameters to send
    $opts[CURLOPT_HTTPAUTH] = CURLAUTH_BASIC;
    $opts[CURLOPT_PROXYUSERPWD] = '['.
        rawurlencode($_SERVER['PHP_AUTH_USER'])
    .']:['.
        rawurlencode($_SERVER['PHP_AUTH_PW'])
    .']'
    ;
}

// init curl session
$call   = $session = curl_init(substr($_SERVER['QUERY_STRING'], 4));

// set all options
curl_setopt_array($call, $opts);

// clear unnecessary variables
unset($opts);
unset($headers);

// retrieve the output
$result = explode(PHP_EOL, curl_exec($call));

// nothing else to do so far (this version is not compatible with COMET)
curl_close($call);

// for each returned information ...
for($i = 0, $length = count($result), $sent = array(); $i < $length; ++$i){
    $value = $result[$i];
    
    // if all headers has been sent ...
    if($value === ''){
        //provoke header output
        // send the output
        echo $result[$i+1];
        ob_end_flush();
        exit;
    }else {
        // ... or send the header (do not overwrite if already sent)
        $tmp = explode(':', $value);
        //header($value, !isset($sent[strtolower($tmp[0])]));
    }
}

?>