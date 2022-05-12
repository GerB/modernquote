<?php

/**
 *
 * Modern quotes. An extension for the phpBB Forum Software package.
 * 
 *
 * @copyright (c) 2017, Ger, https://github.com/GerB
 * @license GNU General Public License, version 2 (GPL-2.0)
 * Slovenian Translation - Marko K.(max, max-ima,...)
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
    'MQ_CLEAR'                 => 'Počisti',
    'MQ_MULTI_QUOTE_SELECT'    => 'Izberite, če želite citirati več objav',
    'MQ_MULTI_QUOTE_ACTION'    => 'Odgovorite z izbranimi citati',
    'MQ_QUOTE_SELECTION'       => 'Izbira citatov',
		));    