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
    protected $request;
    
    static public function getSubscribedEvents()
    {
        return array(
            'core.modify_posting_auth'          => 'override_post_text',
            'core.viewtopic_modify_post_row'	=> 'add_vars',
        );
    }

    public function __construct(\phpbb\request\request $request)
    {
        $this->request = $request;
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
    
    /**
     * Override post text with quote if needed
     */
    public function override_post_text($event)
    {
        if ($event['mode'] == 'quote')
        {
            $post_text = $this->request->variable('post_text', '');
            if (strlen($post_text) > 0) 
            {
                $post_data = $event['post_data'];
                $post_data['post_text'] = $post_text;
                $event['post_data'] = $post_data;
            }
        }
    }
}