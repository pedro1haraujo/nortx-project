@component('mail::message')
# Olá, {{ $user->name }}!

{{ $title }}

{{ $message }}

@component('mail::button', ['url' => config('app.url')])
Verificar
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
