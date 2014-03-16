<?php
class Note {
    public function __construct(array $arguments = array()) {
        if (!empty($arguments)) {
            foreach ($arguments as $property => $argument) {
                $this->{$property} = $argument;
            }
        }
    }

    public function toString() {
        return "Title: " . $this->Title . ". Description: " . $this->Description . ".";
    }

    public function toHTMLString() {
        $res = '<span class="note" id="note' . $this->ID . '" draggable="true">'; 
        $res .= '<span class="moveLeft"><i class="fa fa-arrow-left"></i></span>
                    <span class="moveRight"><i class="fa fa-arrow-right"></i></span>
                    <span class="title">';
        $res .= $this->Title;
        $res .= '</span>';
        if($this->Description)
        {
            $res .= '<span class="content">';
            $res .= $this->Description;
            $res .= '</span>';
        }
        $res .= '</span>';
        return $res;
    }
}
?>