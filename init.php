<?php
    $output = system("npm run dev");
    fwrite(STDOUT, $output);
?>