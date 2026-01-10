<?php

namespace App\Swagger;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    title: "Laravel API Documentation",
    description: "L5 Swagger OpenApi description"
)]
#[OA\SecurityScheme(
    securityScheme: 'bearerAuth',
    type: 'http',
    name: 'Authorization',
    in: 'header',
    scheme: 'bearer',
    bearerFormat: 'Sanctum',
    description: 'Enter your Bearer token in the format **Bearer &lt;token&gt;**'
)]
class Swagger
{
}
