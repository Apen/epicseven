<?php

/**
 * Just execute "php build\GenerateDatas.php" in the root dirrectory
 */

getCharacters('fr');
getCharacters('en');
getCharacters('cn');
getCharacters('zht');

getArtifacts('fr');
getArtifacts('en');
getArtifacts('cn');
getArtifacts('zht');

/**
 * @param string $lang
 */
function getCharacters($lang = 'en')
{
    $json = file_get_contents('https://api.epicsevendb.com/hero?lang=' . $lang);
    if (preg_match('/"results":(\[.*?\]),"meta"/mi', $json, $matches)) {
        if ($lang === 'zht') {
            $lang = 'tw';
        }
        $datas = json_decode($matches[1], true);
        $datasToWrite = [];
        foreach ($datas as $line) {
            $datasToWrite[] = [
                '_id' => $line['_id'],
                'name' => $line['name'],
                'rarity' => $line['rarity'],
                'role' => $line['role'],
                'attribute' => $line['attribute'],
                'zodiac' => $line['zodiac'],
            ];
        }
        $filename = 'assets/js/' . $lang . '.characters.js';
        $content = 'export const ' . $lang . ' = ' . json_encode($datasToWrite) . ';';
        file_put_contents($filename, $content);
    }
}

/**
 * @param string $lang
 */
function getArtifacts($lang = 'en')
{
    $json = file_get_contents('https://api.epicsevendb.com/artifact?lang=' . $lang);
    if (preg_match('/"results":(\[.*?\]),"meta"/mi', $json, $matches)) {
        if ($lang === 'zht') {
            $lang = 'tw';
        }
        $datas = json_decode($matches[1], true);
        $datasToWrite = [];
        foreach ($datas as $line) {
            if ($line['rarity'] > 2) {
                $datasToWrite[] = [
                    '_id' => $line['_id'],
                    'name' => $line['name'],
                    'rarity' => $line['rarity'],
                    'role' => $line['role'],
                ];
            }
        }
        $filename = 'assets/js/' . $lang . '.artifacts.js';
        $content = 'export const ' . $lang . ' = ' . json_encode($datasToWrite) . ';';
        file_put_contents($filename, $content);
    }
}