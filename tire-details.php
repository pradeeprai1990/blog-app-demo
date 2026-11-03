<?php

/**
 * Template Name: Tires Details
 * Template Post Type: product
 * @package almailem
 */
get_header();

$bg_img = get_field('product_banner_image');

?>

<section class="am-pagehead-wrp d-flex align-items-center" style="background-image: url(<?php echo $bg_img; ?>)">
    <div class="container">
        <div class="page-heading text-center text-white">
            <h1 class="h1 mb-0 am-anim-sec"> <?php echo get_the_title(); ?></h1>
        </div>
    </div>
</section>

<?php
$f_title       = get_field('product_desc_title');
$f_description = get_field('first_description');
$f_image       = get_field('first_image');
?>

<section class="tyres-single-page">
    <div class="container">
        <div class="">

            <!-- Intro section -->
            <div class="row">
                <div class="col-lg-6 mt-lg-5">
                    <h3 class="h3 am-heading-top am-anim-sec"><?php echo $f_title; ?></h3>
                    <div class="am-pview-top-content max-75">
                        <p class="mb-5 mb-lg-0 am-anim-sec">
                            <?php echo $f_description; ?>
                        </p>
                    </div>
                </div>
                <div class="col-lg-6 mt-lg-5">
                    <figure class="am-pview-top-img ml-auto position-relative mb-lg-0 am-anim-sec">
                        <img src="<?php echo $f_image; ?>" alt="" class="img-fluid">
                        <span class="am-pview-top-bg am-img-bg">
                            <img src="<?php echo get_template_directory_uri() . '/images/service-bg.svg' ?>" alt="" class="img-fluid">
                        </span>
                    </figure>
                </div>
            </div>

            <div class="row">
                      <!-- Tire services -->
                <?php
                $args = array(
                    'post_type'      => 'tire-service',
                    'posts_per_page' => -1,
                    'meta_query'     => array(
                        array(
                            'key'     => 'wholesale_or_retail',
                            'value'   => array('both', 'wholesale'),
                            'compare' => 'IN'
                        )
                    )
                );

                $query = new WP_Query($args);
                if ($query->have_posts()) {
                    while ($query->have_posts()) {
                        $query->the_post();
                        $category_image = get_field('tire_image'); // Assuming this is a custom field for the post
                        ?>
                        <div class="col-lg-4 col-sm-6 mb-sm-5 mb-xl-0 mb-5 mb-lg-3 mt-4">
                            <div class="am-home-service-box position-relative am-anim-sec our-service-section is-visible">
                                <div class="service-image-box">
                                    <figure>
                                        <?php
                                        $image_url = '';

                                        if (get_field('service_thumbnail')) {
                                            $image_url = get_field('service_thumbnail');
                                        } elseif (has_post_thumbnail()) {
                                            $image     = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'medium');
                                            $image_url = $image ? $image[0] : '';
                                        }

                                        if (!empty($image_url)) { ?>
                                            <img src="<?php echo esc_url($image_url); ?>" alt="<?php the_title(); ?>" />
                                        <?php } else { ?>
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/default-image.jpg" alt="Default Image">
                                        <?php } ?>
                                    </figure>
                                </div>
                                <div class="service-learn-more pl-3 mt-xl-2 mb-xl-5 pb-xl-5 pt-4 pt-xl-3 pb-4">
                                    <h5 class="h5 text-primary"><?php the_title(); ?></h5>
                                    <a class="service-learn-more-link stretched-link" href="<?php the_permalink(); ?>"><b>More<span class="arrow"></span></b></a>
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                    wp_reset_postdata();
                } else {
                    echo '<div class="col-12"><p>No services found.</p></div>';
                }
                ?>

            </div>

            <?php
            $cop_section = get_field('corporate_section');
            $cop_title   = $cop_section['title'];
            $cop_desc    = $cop_section['description'];
            $cop_img     = $cop_section['image'];
            // $cop_btn_txt  = $cop_section['button_text'];
            // $cop_btn_link = $cop_section['button_link'];
            ?>

            <div class="row">

                <!-- Corporate section -->
                <div class="col-lg-12 mt-lg-2">
                    <h3 class="h3 am-heading-top am-anim-sec"><?php echo $cop_title; ?></h3>
                    <div class="row">
                        <div class="col-lg-6">
                            <figure class="am-pview-top-img ml-auto position-relative mb-lg-0 am-anim-sec">
                                <img src="https://www.almailemgroup.com/uae/wp-content/uploads/sites/3/2026/10/Corporate-customer.png" alt="" class="img-fluid">
                            </figure>
                        </div>
                        <div class="col-lg-6 align-content-center">
                            <div class="am-pview-top-content max-75 ml-lg-6 pl-lg-3">
                                <p class="mb-0 am-anim-sec">
                                    <?php echo $cop_desc; ?>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <?php
                $fleet_section  = get_field('fleet_section');
                $fleet_title    = $fleet_section['title'];
                $fleet_desc     = $fleet_section['description'];
                $fleet_img      = $fleet_section['image'];
                $fleet_btn_txt  = $fleet_section['button_text'];
                $fleet_btn_link = $fleet_section['button_link'];
                ?>

                <!-- Fleet section -->
                <div class="col-lg-12 mt-lg-6 pt-lg-2">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="am-pview-bottom-content w-100 max-75">
                                <h3 class="h3 am-heading-top am-anim-sec is-visible"><?php echo $fleet_title; ?> </h3>
                                <?php echo $fleet_desc; ?>
                                <div class="am-pview-bottom-content w-100 mt-5">
                                    <a class="btn btn-primary am-btn am-anim-sec" href="<?php echo $fleet_btn_link; ?>"><span class="am-link"><?php echo $fleet_btn_txt; ?><span class="arrow"></span></span></a>
                                </div>
                                <p></p>
                            </div>
                        </div>
                        <div class="col-lg-6 mt-6 pt-lg-2">
                            <figure class="am-pview-top-img ml-auto position-relative mb-lg-0 am-anim-sec">
                                <img src="https://www.almailemgroup.com/uae/wp-content/uploads/sites/3/2026/10/Fleet-service_.png" alt="" class="img-fluid">
                            </figure>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">

              

                <?php
                $tog_section = get_field('toogle_section');
                $tog_title   = $tog_section['title'];
                $tog_desc    = $tog_section['description'];
                ?>

                <!-- Toggle heading -->
                <div class="col-lg-12">
                    <div class="am-pview-bottom-content w-100">
                        <h3 class="h3 am-heading-top am-anim-sec"><?php echo $tog_title; ?></h3>
                        <p class="mb-5 am-anim-sec"><?php echo $tog_desc; ?></p>
                    </div>
                </div>

                <!-- Accordion -->
                <?php if (have_rows('toogles')): ?>
                    <div class="col-lg-12">
                        <div class="am-accordion-prod am-pview-bottom-content am-anim-sec is-visible" id="accordionExample">
                            <?php
                            $i = 1; // Initialize counter
                            while (have_rows('toogles')): the_row();
                                $title = get_sub_field('title');
                                $desc  = get_sub_field('description');
                                ?>
                                <div class="card">
                                    <div class="card-header" id="heading<?php echo $i; ?>">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse<?php echo $i; ?>" aria-expanded="true" aria-controls="collapse<?php echo $i; ?>">
                                                <?php echo esc_html($title); ?>
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapse<?php echo $i; ?>" class="collapse" aria-labelledby="heading<?php echo $i; ?>" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <?php echo $desc; ?>
                                        </div>
                                    </div>
                                </div>
                                <?php
                                $i++; // Increment counter
                            endwhile; ?>
                        </div>
                    </div>
                <?php endif; ?>

                <?php
                $loc_btn   = get_field('location_button');
                $loc_title = $loc_btn['title'];
                $loc_link  = $loc_btn['link'];
                ?>

            
               
                <!-- Gallery -->
                <?php if (have_rows('image_gallery')): ?>
                    <div class="col-lg-12 mob-van-slider-wrp my-5 garg_gal">
                        <?php
                        while (have_rows('image_gallery')): the_row();
                            $image = get_sub_field('image');
                            ?>
                            <div class="slide-item-each">
                                <figure>
                                    <img src="<?php echo $image; ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                                </figure>
                            </div>
                        <?php endwhile; ?>
                    </div>
                <?php endif; ?>

                <!-- Other Services -->
                <div class="col-lg-12">
                    <style>
                        .other-services { font-family: 'Raleway', sans-serif; padding: 40px 0; }
                        .other-services .section-accent { display: block; width: 58px; height: 5px; background: #b39b6b; clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%); margin-bottom: 18px; }
                        .other-services .section-title { color: #2342a0; font-weight: 700; font-size: clamp(1.9rem, 3.5vw, 2.6rem); line-height: 1.35; margin-bottom: 20px; }
                        .other-services .section-text { font-size: 1.15rem; line-height: 1.85; max-width: 820px; margin-bottom: 48px; }

                        .other-services .service-card { position: relative; display: block; overflow: hidden; border-radius: 14px; aspect-ratio: 3 / 4; box-shadow: 0 10px 30px rgba(27, 35, 64, 0.12); transition: transform 0.4s ease, box-shadow 0.4s ease; }
                        .other-services .service-card img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; transition: transform 0.7s ease; }
                        .other-services .card-overlay { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; color: #fff; background: linear-gradient(to top, rgba(15, 25, 60, 0.92) 0%, rgba(15, 25, 60, 0.55) 40%, rgba(15, 25, 60, 0.05) 75%); transition: background 0.5s ease; }
                        .other-services .card-title { color: #fff; font-family: 'Raleway', sans-serif; font-weight: 700; font-size: 1.2rem; letter-spacing: 0.04em; margin: 0; position: relative; padding-top: 16px; }
                        .other-services .card-title::before { content: ""; position: absolute; top: 0; left: 0; width: 40px; height: 3px; background: #b39b6b; transition: width 0.5s ease; }
                        .other-services .card-details { max-height: 0; opacity: 0; overflow: hidden; transform: translateY(20px); transition: max-height 0.6s ease, opacity 0.4s ease, transform 0.5s ease; }
                        .other-services .card-details p { font-size: 0.95rem; line-height: 1.7; margin: 14px 0 20px; color: rgba(255, 255, 255, 0.9); }
                        .other-services .btn-discover { display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 50px; background: #b39b6b; color: #fff; font-weight: 600; font-size: 0.95rem; border: 2px solid #b39b6b; text-decoration: none; transition: background 0.3s ease, color 0.3s ease; }
                        .other-services .btn-discover .arrow { transition: transform 0.3s ease; }
                        .other-services .btn-discover:hover { background: #fff; color: #2342a0; text-decoration: none; }
                        .other-services .btn-discover:hover .arrow { transform: translateX(5px); }

                        .other-services .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 45px rgba(35, 66, 160, 0.28); }
                        .other-services .service-card:hover img { transform: scale(1.1); }
                        .other-services .service-card:hover .card-overlay { background: linear-gradient(to top, rgba(35, 66, 160, 0.95) 0%, rgba(35, 66, 160, 0.75) 55%, rgba(15, 25, 60, 0.35) 100%); }
                        .other-services .service-card:hover .card-title::before { width: 80px; }
                        .other-services .service-card:hover .card-details { max-height: 320px; opacity: 1; transform: translateY(0); }

                        @media (hover: none) {
                            .other-services .card-details { max-height: none; opacity: 1; transform: none; }
                            .other-services .card-overlay { background: linear-gradient(to top, rgba(15, 25, 60, 0.95) 0%, rgba(15, 25, 60, 0.7) 55%, rgba(15, 25, 60, 0.2) 100%); }
                        }
                        @media (max-width: 575.98px) {
                            .other-services { padding: 28px 0; }
                            .other-services .service-card { aspect-ratio: 4 / 5; }
                            .other-services .card-overlay { padding: 22px; }
                            .other-services .card-title { font-size: 1.25rem; }
                            .other-services .section-text { font-size: 1.05rem; }
                        }
                    </style>

                    <section class="other-services">
                        <span class="section-accent"></span>
                        <h2 class="section-title">Our Other Services</h2>
                        <p class="section-text">
                            Beyond tires, AlMailem offers a complete range of automotive solutions &ndash; from batteries
                            and lubricants to genuine spare parts and expert maintenance &ndash; to keep your vehicle
                            performing at its best.
                        </p>

                        <div class="row">
                            <!-- Automotive Batteries -->
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="service-card">
                                    <img src="https://www.almailemgroup.com/uae/wp-content/uploads/sites/3/2026/10/Battery-Service-UAE.png" alt="Technician installing an automotive battery">
                                    <div class="card-overlay">
                                        <h3 class="card-title">AUTOMOTIVE BATTERIES</h3>
                                        <div class="card-details">
                                            <p>A reliable battery is the heart of your vehicle. Ensure consistent starting power and peak electrical performance in all weather conditions with our premium battery range.</p>
                                            <a href="https://www.almailemgroup.com/uae/product/batteries-retail/" class="btn-discover">Discover More <span class="arrow">&rarr;</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Oil & Lubricants -->
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="service-card">
                                    <img src="https://www.almailemgroup.com/uae/wp-content/uploads/sites/3/2026/10/Oil-Service-UAE.png" alt="Engine oil and lubricants service">
                                    <div class="card-overlay">
                                        <h3 class="card-title">OIL &amp; LUBRICANTS</h3>
                                        <div class="card-details">
                                            <p>Protect your engine and maximize fuel efficiency with our advanced lubricants. Engineered to reduce engine friction and prevent wear, ensuring a smooth drive every time.</p>
                                            <a href="https://www.almailemgroup.com/uae/product/oil-and-lubricants/" class="btn-discover">Discover More <span class="arrow">&rarr;</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Auto Parts -->
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="service-card">
                                    <img src="https://www.almailemgroup.com/uae/wp-content/uploads/sites/3/2026/10/Auto-Parts.png" alt="Auto parts warehouse specialist checking a component">
                                    <div class="card-overlay">
                                        <h3 class="card-title">AUTO PARTS</h3>
                                        <div class="card-details">
                                            <p>Maintain your vehicle's safety and performance with our premium spare parts. We supply high-quality, durable components designed for perfect fitment across all major vehicle brands.</p>
                                            <a href="https://www.almailemgroup.com/uae/product/auto-spare-parts-almailem-group-uae/" class="btn-discover">Discover More <span class="arrow">&rarr;</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Expert Auto Service -->
                            <div class="col-lg-3 col-md-6 mb-4">
                                <div class="service-card">
                                    <img src="https://www.almailemgroup.com/uae/wp-content/uploads/sites/3/2026/10/Auto-Service.png" alt="Skilled technician servicing a vehicle">
                                    <div class="card-overlay">
                                        <h3 class="card-title">EXPERT AUTO SERVICE</h3>
                                        <div class="card-details">
                                            <p>Keep your vehicle running perfectly with our comprehensive maintenance solutions. Our skilled technicians provide fast, reliable, and professional care for all makes and models.</p>
                                            <a href="https://www.almailemgroup.com/uae/services/" class="btn-discover">Discover More <span class="arrow">&rarr;</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <!-- /Other Services -->

                <!-- Partners -->
                <?php
                $partners_title = get_field('partners_title');
                if (have_rows('partners_list')) {
                    ?>
                    <section class="am-pview-brand pt-0">
                        <div class="container">
                            <div class="">
                                <div class="am-brand-padding">
                                    <h3 class="h3 am-heading-top am-anim-sec"> Our Brands</h3>
                                    <ul class="list-unstyled d-flex flex-wrap justify-content-lg-between mb-3 am-brand-slider_prod">
                                        <?php
                                        $i = 0;
                                        while (have_rows('partners_list')): the_row();
                                            $src = get_sub_field('partner_image');
                                            if (!empty($src)) {
                                                ?>
                                                <li class="am-anim-sec">
                                                    <img src="<?php echo $src; ?>" alt="brands" class="img-fluid">
                                                </li>
                                                <?php
                                            }
                                            $i++;
                                        endwhile;
                                        ?>
                                    </ul>
                                </div>
                            </div>

                            <div class="text-center see-all-brand">
                                <!-- <a class="btn btn-primary am-btn am-anim-sec " href="<?php echo $brandslink['url'] . '?id=' . $wholesale_id; ?>"><span class="am-link"><?php echo $brandslink['title']; ?><span class="arrow"></span></span></a> -->
                            </div>
                        </div>
                    </section>
                    <?php
                }
                ?>

            </div><!-- /.row -->
        </div><!-- /wrapper -->
    </div><!-- /.container -->
</section>

<?php
get_footer();
?>