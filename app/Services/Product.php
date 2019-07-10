<?php

namespace App\Services;

class Product
{
    private $id;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getImg()
    {
        return $this->img;
    }

    /**
     * @param mixed $img
     */
    public function setImg($img): void
    {
        $this->img = $img;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description): void
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getPrise()
    {
        return $this->prise;
    }

    /**
     * @param mixed $prise
     */
    public function setPrise($prise): void
    {
        $this->prise = $prise;
    }
    private $img;
    private $title;
    private $description;
    private $prise;

    public static function getProductsData()
    {
        $product = new self();
        $product->id = 0001;
        $product->img = 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5792/5792903ld.jpg';
        $product->title = 'lg tv';
        $product->description = 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r';
        $product->prise = '20';

        return $product;
    }
}
