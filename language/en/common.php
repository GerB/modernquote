<?php

/**
 *
 * Modern quotes. An extension for the phpBB Forum Software package.
 * 
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
    'MQ_CLEAR'                 => 'Clear',
    'MQ_MULTI_QUOTE_SELECT'    => 'Select to quote multiple posts',
    'MQ_MULTI_QUOTE_ACTION'    => 'Reply with selected quotes',
    'MQ_QUOTE_SELECTION'       => 'Quote selection',
		));    