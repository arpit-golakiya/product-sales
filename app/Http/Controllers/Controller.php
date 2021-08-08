<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    /**
     * @param $result
     * @param null $message
     * @param int $code
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResponse($result, $message = null, $code = 200)
    {
        return Response::json([
            'data' => $result,
            'message' => $message,
        ], $code);
    }


    /**
     * @param $errors
     * @param null $message
     * @param int $code
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendErrorResponse($errors, $message = null, $code = 422)
    {
        return Response::json([
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }

    /**
     * @param $error
     * @param int $code
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($error, $code = 422)
    {
        return Response::json([
            'message' => $error,
        ], $code);
    }

    /**
     * @param $message
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendSuccess($message)
    {
        return Response::json([
            'success' => true,
            'message' => $message,
        ], 200);
    }
}
