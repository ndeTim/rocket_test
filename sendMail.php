<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = isset($_POST['firstName']) ? $_POST['firstName'] : '';
    $phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : '';
    
    if (!empty($firstName) && !empty($phoneNumber)) {
        $to = "rbru-metrika@yandex.ru";
        
        $subject = "Новая заявка с сайта";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: no-reply@rocket_test.com" . "\r\n";
        
        $message = "
        <html>
        <head>
            <title>Новая заявка</title>
        </head>
        <body>
            <p><strong>Имя:</strong> $firstName</p>
            <p><strong>Телефон:</strong> $phoneNumber</p>
        </body>
        </html>
        ";
        
        if (mail($to, $subject, $message, $headers)) {
            echo "Письмо отправлено успешно!";
        } else {
            echo "Произошла ошибка при отправке письма.";
        }
    } else {
        echo "Пожалуйста, заполните все обязательные поля.";
    }
} else {
    echo "Некорректный запрос.";
}
?>
