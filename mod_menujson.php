<?php
// No direct access
defined('_JEXEC') or die;
// Include the syndicate functions only once
require_once dirname(__FILE__) . '/helper.php';
//Get parameters of administrator
 $Menumob = ModMenu::getMenu($params);
require JModuleHelper::getLayoutPath('mod_menujson');
$mod_path = 'modules/mod_menujson/';
$responses = array();
$menu = $app->getMenu();
$lang = JFactory::getLanguage();
$pagelang = $lang->getTag();

//English or portuguese
if($pagelang == 'pt-PT')
{                   
      $menuitem = $menu->getItems('menutype', 'menu-mobile');

}
if($pagelang == 'en-GB')
{
      $menuitem = $menu->getItems('menutype', 'menu-mobile');

}
foreach ($menuitem as $row) 
    {
        // append row data to $responses array
        $responses[]= array(
            'id' => $row->id,
            'title' => $row->title,
            'link' => $row->link,
            'alias' => $row->alias,
            'parent_id' => $row->parent_id,
            'level' => $row->level,
            'language' => $row->language,
        );
}
$jsondata = json_encode($responses);
$pathJSON=$mod_path.'/json/menu'.strtolower($pagelang).'.json';
file_put_contents($pathJSON, $jsondata);
?>