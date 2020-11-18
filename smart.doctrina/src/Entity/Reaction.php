<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Reaction Entity
 *
 * @ApiResource
 * @ORM\Entity
 * @ORM\Table(name="reactions")
 */
class Reaction
{

    /**
     * @ORM\id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $type;

    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="Article", inversedBy="reactions")
     */
    public $article;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="reactions")
     */
    public $user;

    public function setId($_id) {
        $this->id = $_id;
    }

    public function getId() {
        return $this->id;
    }

    public function setType($_type) {
        $this->type = $_type;
    }

    public function getType() {
        return $this->title;
    }

    public function setCreatedAt($_createdAt) {
        $this->createdAt = $_createdAt;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function setUpdatedAt($_updatedAt) {
        $this->updatedAt = $_updatedAt;
    }

    public function getUpdatedAt() {
        return $this->updatedAt;
    }
}
