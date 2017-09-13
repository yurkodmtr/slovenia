<?php

    $email = isset($_POST['email']) ? $_POST['email'] : 'test@test.com';

    // MailChimp API credentials
    $apiKey = '298a8ae71af8897b392c0f23f9603977-us6';
    $listID = '56ef46ca03';

    // MailChimp API URL
    $memberID = md5(strtolower($email));
    $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
    $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listID . '/members/' . $memberID;

    // member information
    $json = json_encode([
        'email_address' => $email,
        'status'        => 'subscribed'
    ]);

    // send a HTTP POST request with curl
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // store the status message based on response code

    $response = '';
    if ($httpCode == 200) {
        $response = 200;
    } else {
        switch ($httpCode) {
            case 214:
                $response = 214;
                break;
            default:
                $response = 'error';
                break;
        }        
    }

    echo $response;
    die();

?>


