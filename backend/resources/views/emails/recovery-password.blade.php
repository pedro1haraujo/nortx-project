@component('mail::message')
# Recuperação de senha

Olá, {{ $name }}, para alterar sua senha clique ou copie e cole o link no seu navegador: {{ $url }}

Se você não solicitou a recuperação de senha, ignore este e-mail.

Atenciosamente, {{ config('app.name') }}
@endcomponent
