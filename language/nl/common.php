<?php

/**
 *
 * Modern quotes. An extension for the phpBB Forum Software package.
 * [Dutch]
 *
 * @copyright (c) 2017, Ger, https://github.com/GerB
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
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
    'MQ_CLEAR'                 => 'Leegmaken',
    'MQ_MULTI_QUOTE_SELECT'    => 'Selecteer om meerdere berichten te citeren',
    'MQ_MULTI_QUOTE_ACTION'    => 'Reageer met geselecteerde citaten',
    'MQ_QUOTE_SELECTION'       => 'Citeer selectie',
    ));    