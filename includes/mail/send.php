<?php
//Required Headers

header("Access-Control-Allow-Origin: *");
header("Conten-Type: application/json; charset=UTF-8");



if($_POST) {
    //$receipent = "alex.lem2001@gmail.com";
    $subject = "Email from my portfolio site";
    $visitor_name="";
    $visitor_email = "";
    $message ="";
    $fail = array();

//cleans and stores first name in the $visitor_name variable

    if(isset($_POST['firstname']) && !empty($_POST['firstname'])) {
        $visitor_name = filter_var($_POST['firstname'], FILTER_SANITIZE_STRING);
    }else{
        array_push($fail, "firstname");
    }
//cleans and stores last name in the $visitor_name variable
    if(isset($_POST['lastname']) && !empty($_POST['lastname'])){
        $visitor_name .= " ".filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);
    }else{
        array_push($fail, "lastname");
    }

// cleans and stores the email... ^
    if(isset($_POST['email']) && !empty($_POST['email'])){
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), "", $_POST['email']);
        $visitor_email = filter_var($email, FILTER_VALIDATE_EMAIL);
    }else{
        array_push($fail, "email");
    }

//cleans message and stores in $message variable
    if(isset($_POST['message']) && !empty ($_POST['message'])){
        $clean = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        $message = htmlspecialchars($clean);

    }else{
        array_push($fail, "message");
    }
//how to change this out and make this work
$headers = "From: webmaster@alexlem.ca\r\n"."Reply-to: webmaster@alexlem.ca\r\n"."X-MAIL: PHP/".phpversion();

    if(count($fail)==0){
        mail($visitor_email, $subject, $message, $headers);
        $results['message'] = sprintf("Thank you for contacting me, %s. We will respnd within 24 hours.", $visitor_name);
    }else{
        header("HTTP/1.1 488 You Did NOT fill out the form correctly");
        die(json_encode(['message'=> $fail]));
    }
}else{
    $result['message'] = "sorry message could not be submited";
}
echo json_encode($results);








?>