@component('mail::message')
# Olá, {{ $user->name }}!

Sua conta foi ativada com sucesso!

Clique no botão abaixo para acessar o sistema:

Utilize os dados abaixo:

**Email:** {{ $user->email }}

**Senha:** {{ $password }}

@component('mail::button', ['url' => config('app.url'), 'color' => 'green'])
Acessar o sistema
@endcomponent

Ou acesse o sistema através do link: {{ config('app.url') }}

Atenciosamente,<br>
{{ config('app.name') }}
@endcomponent
