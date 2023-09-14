<?php

// This file should be located at your lang directory (app/lang/es?)

return [

    'past'     =>  [
        'second' => 'há :delta segundo|há :delta segundos',
        'minute' => 'há :delta minuto|há :delta minutos',
        'hour'   => 'há :delta hora|há :delta horas',
        'day'    => '{1} ontem|{2} há dois días|[3,Inf] há :delta días',
        'week'   => '{1} há :delta semana|[2,Inf] há :delta semanas',
        'month'  => '{1} há :delta mês|[2,Inf] há :delta meses',
        'year'   => 'há :delta ano|há :delta anos',
    ],

    'future' => [
        'second' => 'em :delta segundo|em :delta segundos',
        'minute' => 'em :delta minuto|em :delta minutos',
        'hour'   => 'em :delta hora|em :delta horas',
        'day'    => '{1} amanhã|{2} em dos días|[3,Inf] em :delta dias',
        'week'   => '{1} em :delta semana|[2,Inf] em :delta semanas',
        'month'  => '{1} em :delta mês|[2,Inf] em :delta meses',
        'year'   => 'em :delta ano|em :delta anos',
    ]
];
