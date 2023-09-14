<?php

if (!function_exists('formatDateToDatabase')) {
    function formatDateToDatabase(string $date = null): ?string
    {
        $date = $date? trim($date) : null;
        $date = $date? substr($date, 0, 10) : null;
        $date = $date === '0000-00-00' ? null : $date;
        $date = $date? str_replace('/', '-', $date) : null;
        if (!$date) {
            return null;
        }
        if (preg_match('/^(\d{2})-(\d{2})-(\d{4})$/', $date, $matches)) {
            $date = "{$matches[3]}-{$matches[2]}-{$matches[1]}";
        }
        return $date;
    }
}
