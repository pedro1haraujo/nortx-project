@component('mail::message')
# Aviso de Expiração do Plano

Olá, {{ $planoUser->user->name }}!

O seu plano "{{ $planoUser->plano->nome }}" está prestes a expirar. Gostaríamos de lembrá-lo para renovar o seu plano antes da data de expiração.

Detalhes do plano:
- Nome do Plano: {{ $planoUser->plano->nome }}
- Data de Expiração: {{ $planoUser->data_expiracao->format('d/m/Y') }}

Agradecemos a sua preferência e estamos à disposição para ajudar com qualquer dúvida.

Atenciosamente,
A equipe do nosso site
@endcomponent
