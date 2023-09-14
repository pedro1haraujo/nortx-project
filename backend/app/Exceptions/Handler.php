<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof MethodNotAllowedHttpException) {
            $exception = new MethodNotAllowedHttpException($exception->getHeaders(), 'Method Not Allowed', $exception, 405);
        }
        if ($exception instanceof NotFoundHttpException) {
            $exception = new NotFoundHttpException('Algo deu errado! A página não foi encontrada!', $exception, 404);
        }
        if ($request->is("api/*")) {
            $status = $this->isHttpException($exception) ? $exception->getCode() : 400;
            $status = $status === 0 ? 400 : $status;
            $message = $exception->getMessage() ?? "Algo deu errado ao tentar executar a requisição!";
            if ($exception instanceof ModelNotFoundException) {
                $status = 404;
                $message = "Registro não encontrado!";
            }
            if ($exception instanceof NotFoundHttpException) {
                $status = 404;
                $message = "Página não encontrada!";
            }
            if ($exception instanceof AuthorizationException) {
                $status = 401;
                $message = "Você não tem permissão para executar esta ação!";
            }
            if ($exception instanceof ValidationException && $message === 'The given data was invalid.') {
                $status = 422;
                $message = "Os dados informados são inválidos!";
            }
            $status = $status ?? 500;
            $response['message'] = $message;
            if (config('app.debug') === true) {
                $response['exception'] = get_class($exception);
                $response['file'] = $exception->getFile();
                $response['line'] = $exception->getLine();
                $response['trace'] = $exception->getTrace();
            }
            return response()->json($response, $status);
        }
        return parent::render($request, $exception);
    }
}
