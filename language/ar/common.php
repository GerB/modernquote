<?php

/**
 *
 * Modern quotes. An extension for the phpBB Forum Software package.
 * 
 *
 * @copyright (c) 2017, Ger, https://github.com/GerB
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 * Translated By : Bassel Taha Alhitary <http://alhitary.net>
 */
if (!defined('IN_PHPBB'))
{
	exit;
}

if (empty($lang) || !is_array($lang))
{
	$lang = array();
}

$lang = array_merge($lang, array(
    'MQ_CLEAR'                 => 'حذف',
    'MQ_MULTI_QUOTE_SELECT'    => 'انقر لإقتباس أكثر من مشاركة',
    'MQ_MULTI_QUOTE_ACTION'    => 'الرد مع الإقتباسات المحددة',
    'MQ_QUOTE_SELECTION'       => 'تحديد الإقتباس',
		));
