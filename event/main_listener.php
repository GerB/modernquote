<?php
/**
 *
 * Modern quote, extension for phpBB to make selective quoting possible.
 *
 * @copyright (c) 2017, Ger, https://github.com/GerB
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */

namespace ger\modernquote\event;

/**
 * @ignore
 */
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event listener.
 */
class main_listener implements EventSubscriberInterface
{
    static public function getSubscribedEvents()
    {
        return array(
            'core.viewtopic_modify_post_row'	=> 'add_vars',
        );
    }

    /**
     * Add post time to topic row
     */
    public function add_vars($event)
    {
	$post_row = $event['post_row'];
	$post_row['POST_TIME'] = $event['row']['post_time'];
	$event['post_row'] = $post_row;
    }
}