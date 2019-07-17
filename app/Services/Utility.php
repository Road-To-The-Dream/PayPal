<?php

namespace App\Services;

/**
 * Class Utility
 * @package App\Services
 */
class Utility
{
    /**
     * @param array $fieldsValue
     * @return array
     */
    public static function cleanField($fieldsValue = []): array
    {
        return array_map(function ($item) {
            $fieldValue = trim($item);
            $fieldValue = stripslashes($fieldValue);
            $fieldValue = strip_tags($fieldValue);

            return htmlspecialchars($fieldValue);
        }, $fieldsValue);
    }
}
